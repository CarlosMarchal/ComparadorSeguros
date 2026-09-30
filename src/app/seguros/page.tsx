import type { Metadata } from "next";
import { DirectorioRamos } from "@/components/DirectorioRamos";
import { ramos } from "@/data/ramos";
import { companias } from "@/data/companias";
import { productos } from "@/data/productos";

export const metadata: Metadata = {
  title: "Todos los seguros que puedes comparar",
  description: `Los ${ramos.length} tipos de seguro que comparamos entre las principales aseguradoras: salud, hogar, coche, vida, decesos, viaje, mascotas y negocio.`,
  alternates: { canonical: "/seguros" },
};

export default function SegurosPage() {
  return (
    <section className="wrap py-12 sm:py-14">
      <h1 className="t-display max-w-2xl text-fg">
        Todos los seguros que puedes comparar
      </h1>
      <p className="t-cuerpo mt-3 max-w-xl text-dim">
        {ramos.length} ramos, de lo personal a lo empresarial. En cada uno
        enfrentamos las pólizas de las principales aseguradoras cobertura a
        cobertura.
      </p>

      <div className="mt-10">
        <DirectorioRamos />
      </div>
    </section>
  );
}
