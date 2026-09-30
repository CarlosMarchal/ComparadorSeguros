/**
 * Aseguradoras disponibles en el comparador.
 *
 * LOGOTIPOS
 * ---------
 * Los archivos oficiales están en `public/logos/<slug>.png`, recortados y
 * con el fondo blanco convertido en transparencia. Para sustituir uno,
 * deja el nuevo archivo con el mismo nombre y ajusta `alto` si hace falta.
 *
 * Usa siempre los archivos que te facilite cada aseguradora en su manual
 * de marca: son ellas quienes autorizan el uso y quienes fijan versión,
 * área de respeto y tamaño mínimo.
 *
 * `alto` es la altura en píxeles a la que se verá el logo; ajústala por
 * compañía para que todos pesen ópticamente lo mismo en una fila.
 */

export type Compania = {
  slug: string;
  nombre: string;
  nombreLargo: string;
  color: string;
  logo?: string;
  alto?: number;
  ramos: string[];
};

export const companias: Compania[] = [
  {
    slug: "adeslas",
    nombre: "Adeslas",
    nombreLargo: "SegurCaixa Adeslas",
    color: "#0072ce",
    logo: "/logos/adeslas.png",
    alto: 26,
    ramos: ["salud", "dental", "hogar", "decesos", "vida", "automovil"],
  },
  {
    slug: "asisa",
    nombre: "Asisa",
    nombreLargo: "Asisa Seguros",
    color: "#00a19a",
    logo: "/logos/asisa.png",
    alto: 18,
    ramos: ["salud", "dental", "vida", "accidentes-personales"],
  },
  {
    slug: "mapfre",
    nombre: "Mapfre",
    nombreLargo: "Mapfre España",
    color: "#d0021b",
    logo: "/logos/mapfre.png",
    alto: 30,
    ramos: [
      "salud",
      "hogar",
      "automovil",
      "vida",
      "decesos",
      "mascotas",
      "viaje",
      "multirriesgo-empresarial",
      "responsabilidad-civil",
    ],
  },
  {
    slug: "caser",
    nombre: "Caser",
    nombreLargo: "Caser Seguros",
    color: "#e2001a",
    logo: "/logos/caser.png",
    alto: 28,
    ramos: [
      "salud",
      "hogar",
      "decesos",
      "vida",
      "ahorro",
      "comunidad-de-propietarios",
      "mascotas",
    ],
  },
  {
    slug: "allianz",
    nombre: "Allianz",
    nombreLargo: "Allianz Seguros",
    color: "#003781",
    logo: "/logos/allianz.png",
    alto: 20,
    ramos: [
      "salud",
      "automovil",
      "hogar",
      "vida",
      "ahorro",
      "multirriesgo-empresarial",
      "responsabilidad-civil",
      "averia-de-maquinaria",
      "transporte-de-mercancias",
    ],
  },
  {
    slug: "liberty",
    nombre: "Liberty",
    nombreLargo: "Liberty Seguros",
    color: "#c89100",
    logo: "/logos/liberty.png",
    alto: 30,
    ramos: ["automovil", "hogar", "vida", "responsabilidad-civil"],
  },
];

export const companiaPorSlug = (slug: string) =>
  companias.find((c) => c.slug === slug);
