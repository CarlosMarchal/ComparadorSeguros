/**
 * Foto de cada ramo.
 *
 * Los archivos están en public/fotos con licencia CC0 / dominio público
 * (ver public/fotos/CREDITOS.md). Para cambiar una imagen basta con
 * sustituir el archivo manteniendo el nombre y la proporción 16:9.
 *
 * `foco` desplaza el encuadre cuando el motivo no está centrado.
 */

export const fotos: Record<string, { src: string; foco?: string }> = {
  salud: { src: "/fotos/salud.webp" },
  vida: { src: "/fotos/vida.webp", foco: "50% 40%" },
  decesos: { src: "/fotos/decesos.webp" },
  "accidentes-personales": { src: "/fotos/accidentes.webp" },
  ahorro: { src: "/fotos/ahorro.webp" },

  hogar: { src: "/fotos/hogar.webp" },
  "comunidad-de-propietarios": { src: "/fotos/hogar.webp", foco: "30% 50%" },

  automovil: { src: "/fotos/automovil.webp" },

  "multirriesgo-empresarial": { src: "/fotos/empresa.webp" },
  "responsabilidad-civil": { src: "/fotos/empresa.webp", foco: "70% 50%" },
  "averia-de-maquinaria": { src: "/fotos/transporte.webp", foco: "40% 50%" },
  "transporte-de-mercancias": { src: "/fotos/transporte.webp" },
  "colectivo-de-salud": { src: "/fotos/salud.webp", foco: "35% 50%" },
  "colectivo-de-accidentes": { src: "/fotos/accidentes.webp", foco: "60% 50%" },
  "colectivo-de-vida": { src: "/fotos/vida.webp", foco: "60% 45%" },

  viaje: { src: "/fotos/viaje.webp" },
  mascotas: { src: "/fotos/mascotas.webp" },
};

export const fotoHero = "/fotos/hero.webp";

export const fotoDe = (slug: string) => fotos[slug]?.src ?? fotoHero;
export const focoDe = (slug: string) => fotos[slug]?.foco ?? "50% 50%";
