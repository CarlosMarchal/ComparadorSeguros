import Image from "next/image";
import { fotoDe, focoDe } from "@/data/fotos";

/**
 * Fotografía de un ramo. Las imágenes son CC0 / dominio público y viven en
 * public/fotos (ver CREDITOS.md). Siempre van detrás de un velo, porque su
 * papel es ambientar, no competir con el texto.
 *
 * `velo` controla el oscurecido: "tarjeta" para las fichas, "portada" para
 * fondos a sangre y "ninguno" cuando el texto va aparte.
 */
export function Foto({
  slug,
  className = "",
  velo = "tarjeta",
  prioridad = false,
  sizes = "(max-width: 768px) 50vw, 360px",
}: {
  slug: string;
  className?: string;
  velo?: "tarjeta" | "portada" | "ninguno";
  prioridad?: boolean;
  sizes?: string;
}) {
  const clase =
    velo === "portada" ? "velo-foto" : velo === "tarjeta" ? "velo-tarjeta" : "";

  return (
    <div className={`relative overflow-hidden ${clase} ${className}`}>
      <Image
        src={fotoDe(slug)}
        alt=""
        fill
        priority={prioridad}
        sizes={sizes}
        style={{ objectFit: "cover", objectPosition: focoDe(slug) }}
      />
    </div>
  );
}
