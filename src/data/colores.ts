/**
 * Color propio de cada ramo, derivado del de su familia.
 *
 * Si todos los ramos de una familia comparten color exacto, una fila con
 * Salud, Vida y Decesos son tres cajas azules iguales. Y si cada ramo lleva un
 * color elegido a mano, se pierde la pista de qué va con qué.
 *
 * La salida intermedia: se rota el tono unos grados según la posición del ramo
 * dentro de su familia. Quedan azules distintos pero emparentados, la leyenda
 * de familias sigue siendo cierta y no hay que mantener diecisiete hexadecimales.
 */

import { ramos } from "./ramos";
import { familias } from "./site";

/* --- conversiones de color, sin dependencias ---------------------------- */

function hexARgb(hex: string) {
  const n = parseInt(hex.slice(1), 16);
  return { r: (n >> 16) & 255, g: (n >> 8) & 255, b: n & 255 };
}

function rgbAHsl({ r, g, b }: { r: number; g: number; b: number }) {
  r /= 255; g /= 255; b /= 255;
  const max = Math.max(r, g, b), min = Math.min(r, g, b);
  const l = (max + min) / 2;
  const d = max - min;
  if (d === 0) return { h: 0, s: 0, l };
  const s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
  let h: number;
  if (max === r) h = ((g - b) / d + (g < b ? 6 : 0)) / 6;
  else if (max === g) h = ((b - r) / d + 2) / 6;
  else h = ((r - g) / d + 4) / 6;
  return { h, s, l };
}

function hslAHex(h: number, s: number, l: number) {
  h = ((h % 1) + 1) % 1;
  s = Math.min(1, Math.max(0, s));
  l = Math.min(1, Math.max(0, l));
  const f = (n: number) => {
    const k = (n + h * 12) % 12;
    const a = s * Math.min(l, 1 - l);
    const v = l - a * Math.max(-1, Math.min(k - 3, Math.min(9 - k, 1)));
    return Math.round(v * 255);
  };
  return (
    "#" +
    [f(0), f(8), f(4)].map((x) => x.toString(16).padStart(2, "0")).join("")
  );
}

/* --- contraste ---------------------------------------------------------- */

function luminancia(hex: string) {
  const { r, g, b } = hexARgb(hex);
  const c = [r, g, b].map((v) => {
    v /= 255;
    return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
  });
  return 0.2126 * c[0] + 0.7152 * c[1] + 0.0722 * c[2];
}

/** Razón de contraste de la WCAG entre dos colores. */
function contraste(a: string, b: string) {
  const l1 = luminancia(a), l2 = luminancia(b);
  return (Math.max(l1, l2) + 0.05) / (Math.min(l1, l2) + 0.05);
}

/**
 * Baja la luminosidad de un tono hasta que contraste lo bastante con blanco.
 *
 * Rotar el matiz cambia la luminosidad percibida aunque el valor L sea el
 * mismo: el cian del extremo azul se quedaba en 2,67 sobre el disco blanco,
 * por debajo del 3:1 que la WCAG 1.4.11 pide a un elemento gráfico. En vez de
 * corregir ese color a mano, se ajusta cualquiera que no llegue.
 */
function sobreBlanco(h: number, s: number, l: number, minimo = 3.2) {
  let color = hslAHex(h, s, l);
  let luz = l;
  while (contraste(color, "#ffffff") < minimo && luz > 0.12) {
    luz -= 0.02;
    color = hslAHex(h, s, luz);
  }
  return color;
}

/* --- derivación --------------------------------------------------------- */

/**
 * Cuánto se abre el abanico de tonos dentro de una familia, en grados.
 *
 * Con un paso fijo por hijo, una familia de siete se desparramaba de magenta a
 * verde y dejaba de leerse como una familia. Así se reparte un arco acotado
 * entre los que haya: dos hermanos quedan bien separados y siete siguen siendo
 * reconociblemente del mismo color.
 */
const ARCO_MAXIMO = 30 / 360;

const mapa: Record<string, { base: string; oscuro: string; tenue: string }> = {};

for (const f of familias) {
  const hijos = ramos.filter((r) => r.familia === f.slug);
  const { h, s, l } = rgbAHsl(hexARgb(f.color));

  const arco = Math.min(ARCO_MAXIMO, (hijos.length - 1) * (9 / 360));
  const paso = hijos.length > 1 ? arco / (hijos.length - 1) : 0;

  hijos.forEach((r, i) => {
    // Se reparte el desplazamiento a los dos lados del tono de la familia,
    // así el conjunto sigue centrado en el color que enseña la leyenda.
    const hr = h + (i - (hijos.length - 1) / 2) * paso;

    mapa[r.slug] = {
      // el color de marca del ramo, garantizando que el icono se vea sobre el
      // disco blanco de la tarjeta
      base: sobreBlanco(hr, s, l),
      // para el texto: mismo tono, bastante más oscuro, para que contraste
      // de sobra sobre el fondo teñido
      oscuro: hslAHex(hr, Math.min(1, s * 0.95), Math.max(0.2, l * 0.55)),
      // para el fondo de la tarjeta: mismo tono, muy claro y poco saturado
      tenue: hslAHex(hr, Math.min(1, s * 0.62), 0.945),
    };
  });
}

export type ColorRamo = { base: string; oscuro: string; tenue: string };

const RESERVA: ColorRamo = { base: "#0a7f92", oscuro: "#0b3d46", tenue: "#eef6f8" };

export const colorDeRamo = (slug: string): ColorRamo => mapa[slug] ?? RESERVA;
