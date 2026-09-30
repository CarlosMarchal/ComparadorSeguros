import type { SVGProps } from "react";

type Props = SVGProps<SVGSVGElement> & { name: string };

const paths: Record<string, React.ReactNode> = {
  salud: (
    <>
      <path d="M9.4 3.5h5.2v5.9h5.9v5.2h-5.9v5.9H9.4v-5.9H3.5V9.4h5.9Z" />
    </>
  ),
  vida: (
    <>
      <path d="M12 20.5s-7.5-4.6-7.5-9.8A4.2 4.2 0 0 1 12 8a4.2 4.2 0 0 1 7.5 2.7c0 5.2-7.5 9.8-7.5 9.8Z" />
      <path d="M8 4.5c1.5-1 2.8-1 4 0 1.2-1 2.5-1 4 0" />
    </>
  ),
  decesos: (
    <>
      <path d="M6 21V10a6 6 0 0 1 12 0v11" />
      <path d="M4 21h16" />
      <path d="M12 8v6M9.5 10.5h5" />
    </>
  ),
  accidentes: (
    <>
      <path d="M13 2 4.5 13.5H11L10 22l8.5-11.5H12L13 2Z" />
    </>
  ),
  ahorro: (
    <>
      <path d="M3.5 12.5c0-3.3 3.2-5.5 7-5.5 1 0 2 .2 2.9.5l2.6-1.7v2.6c1 .8 1.7 1.8 2 3l1.8.6v3.2l-1.9.2c-.4.8-1 1.5-1.8 2v2.1h-2.4l-.7-1.3c-1.2.2-2.4.2-3.6 0L8.7 19.5H6.3v-2.2c-1.7-1.1-2.8-2.8-2.8-4.8Z" />
      <path d="M13.5 11h2" />
      <circle cx="9.2" cy="11.6" r=".6" fill="currentColor" stroke="none" />
    </>
  ),
  hogar: (
    <>
      <path d="M3.5 11 12 4l8.5 7" />
      <path d="M5.5 9.8V20h13V9.8" />
      <path d="M10 20v-5.5h4V20" />
    </>
  ),
  comunidad: (
    <>
      <path d="M4 20V6l6-2.5V20" />
      <path d="M10 20V9l9 3v8" />
      <path d="M2.5 20h19" />
      <path d="M6.5 9h1M6.5 13h1M13 14h1M16 14h1M13 17h1M16 17h1" />
    </>
  ),
  auto: (
    <>
      <path d="M4 16.5h16M5 16.5v2.2M19 16.5v2.2" />
      <path d="M4.5 16.5 6 10.6A2 2 0 0 1 7.9 9h8.2a2 2 0 0 1 1.9 1.6l1.5 5.9" />
      <path d="M7 13.5h10" />
      <circle cx="8" cy="16.5" r="1.3" />
      <circle cx="16" cy="16.5" r="1.3" />
    </>
  ),
  empresa: (
    <>
      <path d="M3 20h18" />
      <path d="M5 20V8l7-4 7 4v12" />
      <path d="M9.5 20v-5h5v5" />
      <path d="M9 10.5h1.5M13.5 10.5H15" />
    </>
  ),
  rc: (
    <>
      <path d="M12 3.5 5 6.2v5.4c0 4.2 2.9 7.6 7 8.9 4.1-1.3 7-4.7 7-8.9V6.2L12 3.5Z" />
      <path d="M9.5 12.2l1.9 1.9 3.4-3.7" />
    </>
  ),
  maquinaria: (
    <>
      <path d="M9.66 4.98 10.05 2.6h3.9l.39 2.38.97.4 1.96-1.4 2.75 2.75-1.4 1.96.4.97 2.38.39v3.9l-2.38.39-.4.97 1.4 1.96-2.75 2.75-1.96-1.4-.97.4-.39 2.38h-3.9l-.39-2.38-.97-.4-1.96 1.4-2.75-2.75 1.4-1.96-.4-.97L2.6 13.95v-3.9l2.38-.39.4-.97-1.4-1.96 2.75-2.75 1.96 1.4Z" />
      <circle cx="12" cy="12" r="3.1" />
    </>
  ),
  transporte: (
    <>
      <path d="M2.5 16.5V8h10v8.5" />
      <path d="M12.5 11H17l3.5 3v2.5h-8" />
      <circle cx="7" cy="17" r="1.6" />
      <circle cx="17" cy="17" r="1.6" />
    </>
  ),
  colectivoSalud: (
    <>
      <circle cx="8.5" cy="8" r="2.5" />
      <path d="M3.5 19c0-2.8 2.2-4.6 5-4.6s5 1.8 5 4.6" />
      <path d="M17 7.5v6M14 10.5h6" />
    </>
  ),
  colectivoAccidentes: (
    <>
      <circle cx="8.5" cy="8" r="2.5" />
      <path d="M3.5 19c0-2.8 2.2-4.6 5-4.6s5 1.8 5 4.6" />
      <path d="M18 6.5 15 12h3.5l-1 5 3.5-6h-3l1-4.5Z" />
    </>
  ),
  colectivoVida: (
    <>
      <circle cx="8.5" cy="8" r="2.5" />
      <path d="M3.5 19c0-2.8 2.2-4.6 5-4.6s5 1.8 5 4.6" />
      <path d="M17.5 14s-3-1.9-3-4a1.7 1.7 0 0 1 3-1.1A1.7 1.7 0 0 1 20.5 10c0 2.1-3 4-3 4Z" />
    </>
  ),
  viaje: (
    <>
      <path d="M3 12.5 21 5l-4 8 4 7-18-7.5Z" />
      <path d="M8.5 14.2 8 20l3.4-3.2" />
    </>
  ),
  mascotas: (
    <>
      <ellipse cx="6" cy="9.5" rx="1.7" ry="2.2" />
      <ellipse cx="10.5" cy="7" rx="1.7" ry="2.3" />
      <ellipse cx="15.5" cy="7" rx="1.7" ry="2.3" />
      <ellipse cx="19.5" cy="10.5" rx="1.7" ry="2.2" />
      <path d="M13 12c2.6 0 4.8 1.9 4.8 4.3 0 2-1.6 3.2-3.4 3.2-1 0-1.6-.4-2.4-.4s-1.4.4-2.4.4c-1.8 0-3.4-1.2-3.4-3.2C6.2 13.9 8.4 12 11 12h2Z" />
    </>
  ),
  check: <path d="m4.5 12.5 5 5 10-11" />,
  cross: <path d="M6 6l12 12M18 6 6 18" />,
  flecha: <path d="M4 12h15m-5.5-5.5L19.5 12l-6 5.5" />,
  telefono: (
    <path d="M6.5 3.5h3l1.5 4-2 1.5a12 12 0 0 0 6 6l1.5-2 4 1.5v3a2 2 0 0 1-2.2 2C11.4 19 5 12.6 4.5 5.7a2 2 0 0 1 2-2.2Z" />
  ),
  mail: (
    <>
      <rect x="3" y="5.5" width="18" height="13" rx="2" />
      <path d="m4 7 8 6 8-6" />
    </>
  ),
  balanza: (
    <>
      <path d="M12 4v16M6 20h12" />
      <path d="M12 7 5 9l-2 5a3.5 3.5 0 0 0 7 0L12 7Z" />
      <path d="m12 7 7 2 2 5a3.5 3.5 0 0 1-7 0L12 7Z" />
    </>
  ),
  escudo: (
    <path d="M12 3.5 5 6.2v5.4c0 4.2 2.9 7.6 7 8.9 4.1-1.3 7-4.7 7-8.9V6.2L12 3.5Z" />
  ),
  reloj: (
    <>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M12 7.5V12l3 2" />
    </>
  ),
  chat: (
    <path d="M20 12.5c0 3.9-3.6 7-8 7-1 0-2-.2-2.9-.5L4 20.5l1.6-3.7A6.6 6.6 0 0 1 4 12.5c0-3.9 3.6-7 8-7s8 3.1 8 7Z" />
  ),
  usuarios: (
    <>
      <circle cx="9" cy="8" r="3" />
      <path d="M3 19.5c0-3.1 2.7-5.2 6-5.2s6 2.1 6 5.2" />
      <path d="M16 5.5a3 3 0 0 1 0 5.6M17.5 14.6c2.1.6 3.5 2.3 3.5 4.4" />
    </>
  ),
  documento: (
    <>
      <path d="M13.5 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8.5L13.5 3Z" />
      <path d="M13.5 3v5.5H19" />
      <path d="M9 13.5h6M9 17h4" />
    </>
  ),
  chip: (
    <>
      <rect x="7" y="7" width="10" height="10" rx="2" />
      <path d="M10.5 10.5h3v3h-3z" />
      <path d="M10 4v3M14 4v3M10 17v3M14 17v3M4 10h3M4 14h3M17 10h3M17 14h3" />
    </>
  ),
  brillo: (
    <>
      <path d="M12 3.5 13.7 9l5.3 1.7-5.3 1.7L12 17.7l-1.7-5.3L5 10.7 10.3 9 12 3.5Z" />
      <path d="M18.5 16.5l.7 2 2 .7-2 .7-.7 2-.7-2-2-.7 2-.7.7-2Z" />
    </>
  ),
  euro: (
    <>
      <path d="M17.5 7.5A6 6 0 0 0 7.8 9.4a6.6 6.6 0 0 0 0 5.2 6 6 0 0 0 9.7 1.9" />
      <path d="M4.5 10.5h7M4.5 13.5h7" />
    </>
  ),
  estrella: (
    <path d="m12 3.8 2.6 5.3 5.9.9-4.3 4.1 1 5.8-5.2-2.7-5.2 2.7 1-5.8L3.5 10l5.9-.9L12 3.8Z" />
  ),
};

export function Icono({ name, ...props }: Props) {
  const d = paths[name] ?? paths.escudo;
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.6}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      {d}
    </svg>
  );
}
