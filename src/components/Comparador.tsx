"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import type { Ramo } from "@/data/ramos";
import type { Producto } from "@/data/productos";
import { LogoCompania, Tick } from "./ui";
import { Icono } from "./Iconos";

type Props = { ramo: Ramo; productos: Producto[] };
type Orden = "precio" | "coberturas" | "alfabetico";

function cuentaCoberturas(p: Producto) {
  return Object.values(p.valores).filter((v) => v === true).length;
}

export function Comparador({ ramo, productos }: Props) {
  const [seleccion, setSeleccion] = useState<string[]>(
    productos.slice(0, 3).map((p) => p.id),
  );
  const [orden, setOrden] = useState<Orden>("precio");
  const [vista, setVista] = useState<"tarjetas" | "tabla">("tarjetas");

  const ordenados = useMemo(() => {
    return [...productos].sort((a, b) => {
      if (orden === "precio") {
        if (a.desde === null) return 1;
        if (b.desde === null) return -1;
        return a.desde - b.desde;
      }
      if (orden === "coberturas") return cuentaCoberturas(b) - cuentaCoberturas(a);
      return a.nombre.localeCompare(b.nombre, "es");
    });
  }, [productos, orden]);

  const comparados = ordenados.filter((p) => seleccion.includes(p.id));
  const mejorPrecio = ordenados.find((p) => p.desde !== null)?.id;

  const alternar = (id: string) =>
    setSeleccion((prev) =>
      prev.includes(id)
        ? prev.filter((x) => x !== id)
        : prev.length >= 4
          ? prev
          : [...prev, id],
    );

  return (
    <section id="comparador" className="scroll-mt-20">
      {/* --------------------------------------------------------- Controles */}
      <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
        <Segmentado
          valor={orden}
          onChange={(v) => setOrden(v as Orden)}
          etiqueta="Ordenar por"
          opciones={[
            ["precio", "Precio"],
            ["coberturas", "Coberturas"],
            ["alfabetico", "A-Z"],
          ]}
        />
        <Segmentado
          valor={vista}
          onChange={(v) => setVista(v as "tarjetas" | "tabla")}
          opciones={[
            ["tarjetas", "Tarjetas"],
            ["tabla", "Tabla"],
          ]}
        />
      </div>

      {/* ---------------------------------------------------------- Tarjetas */}
      {vista === "tarjetas" ? (
        <>
          <div className="grid gap-3.5 md:grid-cols-2 xl:grid-cols-3">
            {ordenados.map((p) => {
              const activo = seleccion.includes(p.id);
              const destacados = ramo.criterios.filter((c) => c.destacado);
              return (
                <article
                  key={p.id}
                  className="card flex flex-col p-5"
                  style={{
                    transition:
                      "box-shadow var(--t-control) var(--salida), border-color var(--t-control) ease",
                    ...(activo
                      ? { borderColor: "var(--accent)", boxShadow: "var(--sombra-card)" }
                      : {}),
                  }}

                >
                  <div className="flex items-start justify-between gap-3">
                    <LogoCompania slug={p.compania} />
                    {p.id === mejorPrecio && orden === "precio" && (
                      <span className="bg-warn-soft t-pie rounded-full px-2.5 py-0.5 font-semibold">
                        Más barato
                      </span>
                    )}
                  </div>

                  <h3 className="t-titular mt-3 text-fg">{p.nombre}</h3>

                  <div className="mt-4 flex items-baseline gap-1.5 border-t border-hair pt-4">
                    {p.desde !== null ? (
                      <>
                        <span className="t-pie text-dim">desde</span>
                        <span className="tabular text-[1.7rem] font-semibold leading-none tracking-[-0.022em] text-fg">
                          {p.desde}
                          <span className="text-[1.1rem]"> €</span>
                        </span>
                        <span className="t-pie text-dim">
                          {p.unidad.replace("€", "").trim()}
                        </span>
                      </>
                    ) : (
                      <span className="t-titular text-fg">Presupuesto a medida</span>
                    )}
                  </div>
                  <p className="t-pie mt-1.5 text-dim">{p.notaPrecio}</p>

                  <dl className="mt-4 grid gap-2 border-t border-hair pt-4">
                    {destacados.map((c) => (
                      <div key={c.id} className="flex items-start justify-between gap-4">
                        <dt className="t-pie text-dim">{c.label}</dt>
                        <dd className="t-pie text-right font-medium text-fg">
                          {typeof p.valores[c.id] === "boolean" ? (
                            <Tick ok={p.valores[c.id] as boolean} />
                          ) : (
                            (p.valores[c.id] ?? "—")
                          )}
                        </dd>
                      </div>
                    ))}
                  </dl>

                  <div className="mt-5 flex items-center gap-2 pt-1">
                    <Link
                      href={`/contacto?ramo=${ramo.slug}`}
                      className="bg-accent pulsable flex-1 rounded-full px-4 py-2 text-center text-[0.875rem] font-medium"
                    >
                      Me interesa
                    </Link>
                    <button
                      onClick={() => alternar(p.id)}
                      aria-pressed={activo}
                      className={`pulsable rounded-full border px-3.5 py-2 text-[0.875rem] font-medium ${
                        activo
                          ? "bg-accent-soft border-[var(--accent)]"
                          : "border-strong text-dim"
                      }`}
                    >
                      {activo ? "Comparando" : "Comparar"}
                    </button>
                  </div>
                </article>
              );
            })}
          </div>

          {comparados.length > 1 && (
            <div className="materializa mt-9" key={comparados.map((c) => c.id).join()}>
              <div className="mb-3.5 flex items-baseline justify-between gap-4">
                <h3 className="t-seccion text-fg">
                  Las {comparados.length} seleccionadas, fila a fila
                </h3>
                <span className="t-pie text-dim">Máximo 4</span>
              </div>
              <TablaComparativa ramo={ramo} productos={comparados} />
            </div>
          )}
        </>
      ) : (
        <div className="materializa">
          <TablaComparativa ramo={ramo} productos={ordenados} />
        </div>
      )}
    </section>
  );
}

/* ------------------------------------------------------ Control segmentado */

function Segmentado({
  valor,
  onChange,
  opciones,
  etiqueta,
}: {
  valor: string;
  onChange: (v: string) => void;
  opciones: [string, string][];
  etiqueta?: string;
}) {
  const indice = Math.max(0, opciones.findIndex(([v]) => v === valor));
  const ancho = 100 / opciones.length;

  return (
    <div className="flex items-center gap-2">
      {etiqueta && <span className="t-pie text-dim">{etiqueta}</span>}
      <div className="surface-2 relative flex rounded-full p-0.5">
        {/* El indicador se desplaza entre pestañas en lugar de saltar:
            el movimiento explica de dónde viene el estado nuevo. */}
        <span
          aria-hidden="true"
          className="surface absolute inset-y-0.5 rounded-full"
          style={{
            width: `calc(${ancho}% - 4px)`,
            left: 2,
            transform: `translateX(calc(${indice * 100}% + ${indice * 4}px))`,
            transition: "transform var(--t-control) var(--muelle)",
            boxShadow: "var(--sombra-chip)",
          }}
        />
        {opciones.map(([v, texto]) => {
          const activo = valor === v;
          return (
            <button
              key={v}
              onClick={() => onChange(v)}
              aria-pressed={activo}
              className="pulsable relative z-10 flex-1 whitespace-nowrap rounded-full px-3.5 py-1.5 text-center text-[0.8125rem] font-medium"
              style={{
                color: activo ? "var(--fg)" : "var(--fg-muted)",
                transition: "color var(--t-control) ease",
              }}
            >
              {texto}
            </button>
          );
        })}
      </div>
    </div>
  );
}

/* ========================================================================== */

function TablaComparativa({ ramo, productos }: { ramo: Ramo; productos: Producto[] }) {
  if (productos.length === 0) return null;

  return (
    <div className="scroll-x card">
      <table className="w-full min-w-[620px] border-collapse text-[0.875rem]">
        <thead>
          <tr>
            <th className="surface sticky left-0 z-10 w-48 border-b border-hair p-4 text-left align-bottom">
              <span className="t-rotulo text-dim">Cobertura</span>
            </th>
            {productos.map((p) => (
              <th key={p.id} className="border-b border-l border-hair p-4 text-left align-bottom">
                <LogoCompania slug={p.compania} />
                <p className="t-titular mt-2 text-fg">{p.nombre}</p>
                <p className="tabular t-pie mt-1 text-dim">
                  {p.desde !== null ? (
                    <>
                      desde{" "}
                      <span className="font-semibold text-fg">{p.desde} €</span>{" "}
                      {p.unidad.replace("€", "").trim()}
                    </>
                  ) : (
                    "A medida"
                  )}
                </p>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {ramo.criterios.map((c, i) => (
            <tr key={c.id} className={i % 2 ? "surface-2" : ""}>
              <th
                scope="row"
                className={`sticky left-0 z-10 border-b border-hair p-4 text-left ${i % 2 ? "surface-2" : "surface"}`}
              >
                <span className="t-pie font-medium text-fg">{c.label}</span>
                {c.ayuda && (
                  <span className="mt-0.5 block text-[0.75rem] leading-snug text-dim">
                    {c.ayuda}
                  </span>
                )}
              </th>
              {productos.map((p) => (
                <td key={p.id} className="t-pie border-b border-l border-hair p-4 align-top text-dim">
                  {typeof p.valores[c.id] === "boolean" ? (
                    <Tick ok={p.valores[c.id] as boolean} />
                  ) : (
                    (p.valores[c.id] ?? "—")
                  )}
                </td>
              ))}
            </tr>
          ))}
          <tr>
            <th scope="row" className="surface sticky left-0 z-10 p-4 text-left">
              <span className="t-pie font-medium text-fg">A tener en cuenta</span>
            </th>
            {productos.map((p) => (
              <td key={p.id} className="t-pie border-l border-hair p-4 align-top text-dim">
                <ul className="grid gap-1.5">
                  {p.aTenerEnCuenta.map((n) => (
                    <li key={n} className="flex gap-1.5">
                      <Icono name="cross" className="mt-1 h-2.5 w-2.5 shrink-0 opacity-50" />
                      {n}
                    </li>
                  ))}
                </ul>
              </td>
            ))}
          </tr>
        </tbody>
      </table>
    </div>
  );
}
