/**
 * Identidad del comparador.
 *
 * La web se presenta como un comparador de seguros independiente: no se
 * menciona el nombre de la correduría en el contenido. El único punto donde
 * aparece la condición de mediador es el aviso legal del pie, donde la
 * normativa de la DGSFP obliga a identificar a quien opera el servicio.
 * Rellena `razonSocial` y `registro` con tus datos antes de publicar.
 */
/**
 * Dirección pública del sitio.
 *
 * En Vercel cambia con cada despliegue, así que no puede estar escrita a mano:
 * si lo estuviera, los canonical, el sitemap y las etiquetas de compartir del
 * preview apuntarían al dominio definitivo, que todavía no existe.
 *
 *   NEXT_PUBLIC_SITE_URL   la manda; ponla cuando tengas el dominio final
 *   NEXT_PUBLIC_VERCEL_URL la inyecta Vercel sola en cada despliegue
 *   y si no hay ninguna, el dominio previsto
 */
const urlBase =
  process.env.NEXT_PUBLIC_SITE_URL ||
  (process.env.NEXT_PUBLIC_VERCEL_URL
    ? `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`
    : "") ||
  "https://comparadordeseguros.es";

/**
 * Si los buscadores pueden indexar este despliegue.
 *
 * Por defecto NO. Una URL de pruebas indexada es un problema doble: Google se
 * queda con una web cuyos precios están sin validar, y cuando llegue el
 * dominio bueno los dos se pelean por el mismo contenido. Se abre a propósito,
 * poniendo NEXT_PUBLIC_INDEXAR=true, y solo en el dominio definitivo.
 */
export const INDEXAR = process.env.NEXT_PUBLIC_INDEXAR === "true";

export const site = {
  nombre: "Comparador de Seguros",
  claim: "Compara seguros de verdad",
  descripcion:
    "Compara coberturas, carencias, franquicias y precios orientativos de las principales aseguradoras de España. Salud, hogar, auto, vida, decesos, empresa y más.",
  url: urlBase,
  telefono: "629 121 685",
  telefonoHref: "+34629121685",
  email: "hola@comparadordeseguros.es",
  horario: "Lunes a viernes, de 9:00 a 19:00",

  /* Solo para el aviso legal del pie */
  razonSocial: "Correduría de seguros inscrita en la DGSFP",
  registro:
    "Servicio operado por una correduría de seguros autorizada e inscrita en el Registro de la Dirección General de Seguros y Fondos de Pensiones. El asesoramiento y la comparativa no tienen coste para el usuario.",
} as const;

/**
 * Agrupación de los ramos. Sirve para los filtros del selector y para
 * ordenar el pie de página.
 */
export const familias = [
  { slug: "personales", nombre: "Para ti y los tuyos", corto: "Personales", color: "#0071e3" },
  { slug: "hogar", nombre: "Tu casa", corto: "Hogar", color: "#1d8a4e" },
  { slug: "autos", nombre: "Tu vehículo", corto: "Vehículo", color: "#7d3fc4" },
  { slug: "empresariales", nombre: "Tu negocio", corto: "Negocio", color: "#c2410c" },
  { slug: "otros", nombre: "Viajes y mascotas", corto: "Otros", color: "#b4326b" },
] as const;

export type FamiliaSlug = (typeof familias)[number]["slug"];
