"use client";

import { useEffect, useRef, useState } from "react";
import { Icono } from "./Iconos";

/**
 * «Adjunta tu seguro y compara».
 *
 * Tres pantallas dentro del mismo diálogo: subir, resultado y contacto. No son
 * tres pasos que haya que recorrer a ciegas —el usuario ve desde el principio
 * qué va a pasar con su documento— y en ningún momento se le pide un dato que
 * no haga falta todavía: el teléfono se pide cuando ya ha visto que hemos
 * entendido su póliza, no antes.
 *
 * El archivo no se guarda en ningún sitio: se envía, se lee y se descarta.
 */

const TIPOS = ".pdf,image/jpeg,image/png,image/webp";
const LIMITE_MB = 10;

type Poliza = {
  ramo: string;
  compania: string;
  producto: string;
  prima: string;
  datos: { etiqueta: string; valor: string }[];
  avisos: string[];
  confianza: string;
};

type Fase = "subir" | "analizando" | "resultado" | "enviado";

export function AdjuntarPoliza({
  abierto,
  onCerrar,
  ramo,
}: {
  abierto: boolean;
  onCerrar: () => void;
  ramo?: string;
}) {
  const ref = useRef<HTMLDialogElement>(null);
  const input = useRef<HTMLInputElement>(null);
  const camara = useRef<HTMLInputElement>(null);

  const [fase, setFase] = useState<Fase>("subir");
  const [error, setError] = useState<string | null>(null);
  const [encima, setEncima] = useState(false);
  const [nombre, setNombre] = useState("");
  const [poliza, setPoliza] = useState<Poliza | null>(null);
  const [enviando, setEnviando] = useState(false);

  /**
   * Si el lector de pólizas está configurado en el servidor.
   *
   * `null` mientras se comprueba. Sin esto, alguien podía arrastrar su póliza,
   * esperar, y recibir un error — el peor momento para enterarse de que el
   * servicio no está disponible. Se pregunta al abrir el diálogo, no al cargar
   * la página, para no hacer una petición que casi nadie va a necesitar.
   */
  const [lector, setLector] = useState<boolean | null>(null);

  useEffect(() => {
    if (!abierto || lector !== null) return;
    let vivo = true;
    fetch("/api/analizar-poliza")
      .then((r) => r.json())
      .then((j) => vivo && setLector(Boolean(j.disponible)))
      .catch(() => vivo && setLector(false));
    return () => { vivo = false; };
  }, [abierto, lector]);

  useEffect(() => {
    const d = ref.current;
    if (!d) return;
    if (abierto && !d.open) d.showModal();
    if (!abierto && d.open) d.close();
  }, [abierto]);

  useEffect(() => {
    const d = ref.current;
    if (!d) return;
    const alCerrar = () => {
      onCerrar();
      // Damos tiempo a la animación antes de vaciar el diálogo.
      setTimeout(() => {
        setFase("subir");
        setPoliza(null);
        setError(null);
        setNombre("");
      }, 260);
    };
    d.addEventListener("close", alCerrar);
    return () => d.removeEventListener("close", alCerrar);
  }, [onCerrar]);

  async function analizar(archivo: File) {
    setError(null);

    if (archivo.size > LIMITE_MB * 1024 * 1024) {
      setError(`El archivo pesa más de ${LIMITE_MB} MB. Prueba con una foto más ligera o con menos páginas.`);
      return;
    }
    const valido =
      archivo.type === "application/pdf" || archivo.type.startsWith("image/");
    if (!valido) {
      setError("Solo admitimos PDF o una foto en JPG, PNG o WEBP.");
      return;
    }

    setNombre(archivo.name);
    setFase("analizando");

    const cuerpo = new FormData();
    cuerpo.append("archivo", archivo);
    if (ramo) cuerpo.append("ramo", ramo);

    try {
      const res = await fetch("/api/analizar-poliza", { method: "POST", body: cuerpo });
      const json = await res.json();
      if (!json.ok) {
        setError(json.error ?? "No hemos podido leer el documento.");
        setFase("subir");
        return;
      }
      setPoliza(json.poliza);
      setFase("resultado");
    } catch {
      setError("Se ha cortado la conexión. Inténtalo otra vez.");
      setFase("subir");
    }
  }

  async function pedirLlamada(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const datos = new FormData(e.currentTarget);
    setEnviando(true);
    try {
      await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstname: datos.get("nombre"),
          phone: datos.get("telefono"),
          email: datos.get("email"),
          ramo: poliza?.ramo || ramo || "",
          origen: "adjuntar-poliza",
          // Solo lo que hemos entendido de la póliza; el archivo no se guarda.
          poliza_compania: poliza?.compania ?? "",
          poliza_producto: poliza?.producto ?? "",
          poliza_prima: poliza?.prima ?? "",
        }),
      });
    } catch {
      // El aviso al usuario no depende de que el buzón responda.
    }
    setEnviando(false);
    setFase("enviado");
  }

  const campo =
    "surface w-full rounded-[var(--radius-control)] border border-hair px-3.5 py-2.5 text-[0.95rem] text-fg outline-none transition-colors focus:border-[var(--accent)]";
  const etiqueta = "mb-1.5 block text-xs font-semibold text-fg";

  /**
   * El formulario de llamada, idéntico se llegue a él tras leer la póliza o
   * porque el lector no esté disponible. Es el mismo trámite para el usuario,
   * así que conviene que sea literalmente el mismo formulario.
   */
  const formularioLlamada = (titulo: string) => (
    <form onSubmit={pedirLlamada} className="mt-6 grid gap-4 border-t border-hair pt-6">
      <p className="t-titular text-fg">{titulo}</p>
      <div>
        <label htmlFor="adj-nombre" className={etiqueta}>Nombre</label>
        <input id="adj-nombre" name="nombre" required autoComplete="name" className={campo} placeholder="Tu nombre" />
      </div>
      <div>
        <label htmlFor="adj-telefono" className={etiqueta}>Teléfono</label>
        <input id="adj-telefono" name="telefono" type="tel" required autoComplete="tel" inputMode="tel" className={campo} placeholder="600 000 000" />
      </div>
      <div>
        <label htmlFor="adj-email" className={etiqueta}>Correo electrónico</label>
        <input id="adj-email" name="email" type="email" required autoComplete="email" className={campo} placeholder="tu@email.com" />
      </div>

      <label className="flex items-start gap-2.5 text-xs leading-relaxed text-dim">
        <input type="checkbox" required className="mt-0.5 h-4 w-4 shrink-0 border-hair" style={{ accentColor: "var(--accent)" }} />
        <span>
          Acepto la política de privacidad y que se traten mis datos para
          informarme sobre el seguro solicitado.
        </span>
      </label>

      <button
        type="submit"
        disabled={enviando}
        className="pulsable w-full rounded-full px-5 py-3 text-[0.95rem] font-semibold disabled:opacity-60"
        style={{ background: "var(--accent)", color: "var(--accent-fg)" }}
      >
        {enviando ? "Enviando…" : "Que me llamen"}
      </button>
    </form>
  );

  return (
    <dialog
      ref={ref}
      className="modal surface w-[min(34rem,calc(100vw-2rem))] rounded-[var(--radius-card)] p-0"
      aria-labelledby="adj-titulo"
    >
      <div className="p-6 sm:p-7">
        <button
          type="button"
          onClick={() => ref.current?.close()}
          className="pulsable surface absolute right-4 top-4 z-10 grid h-8 w-8 place-items-center rounded-full border border-hair text-dim"
          aria-label="Cerrar"
        >
          <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round">
            <path d="M6 6l12 12M18 6 6 18" />
          </svg>
        </button>

        {/* ------------------------------------------------------------ Subir */}
        {fase === "subir" && lector === false && (
          <div className="materializa">
            <h2 id="adj-titulo" className="t-seccion pr-10 text-fg">
              Ahora mismo no podemos leer tu póliza
            </h2>
            <p className="t-cuerpo mt-3 text-dim">
              La lectura automática de documentos está en mantenimiento. No
              subas nada todavía: déjanos tu teléfono y un asesor la repasa
              contigo, que para esto no hace falta esperar.
            </p>
            {formularioLlamada("Déjanos un teléfono y lo vemos contigo")}
          </div>
        )}

        {fase === "subir" && lector !== false && (
          <>
            <h2 id="adj-titulo" className="t-seccion pr-10 text-fg">
              Adjunta tu seguro y compara
            </h2>
            <p className="t-pie mt-2 text-dim">
              Sube tu póliza actual y la leemos por ti: compañía, copagos,
              carencias y límites. Después te decimos si te conviene cambiar.
            </p>

            <div
              onDragOver={(e) => { e.preventDefault(); setEncima(true); }}
              onDragLeave={() => setEncima(false)}
              onDrop={(e) => {
                e.preventDefault();
                setEncima(false);
                const f = e.dataTransfer.files?.[0];
                if (f) analizar(f);
              }}
              className={`zona-soltar mt-5 rounded-[var(--radius-card)] border-2 border-dashed p-7 text-center ${
                encima ? "zona-soltar-activa" : "border-strong"
              }`}
            >
              <span className="bg-accent-soft mx-auto grid h-12 w-12 place-items-center rounded-full">
                <Icono name="documento" className="h-6 w-6" />
              </span>
              <p className="t-titular mt-3.5 text-fg">Arrastra aquí tu póliza</p>
              <p className="t-pie mt-1 text-dim">PDF o foto, hasta {LIMITE_MB} MB</p>

              <div className="mt-5 flex flex-col justify-center gap-2.5 sm:flex-row">
                <button
                  type="button"
                  onClick={() => input.current?.click()}
                  className="pulsable rounded-full px-5 py-2.5 text-[0.9rem] font-semibold"
                  style={{ background: "var(--accent)", color: "var(--accent-fg)" }}
                >
                  Elegir archivo
                </button>
                <button
                  type="button"
                  onClick={() => camara.current?.click()}
                  className="pulsable rounded-full border-2 px-5 py-2.5 text-[0.9rem] font-semibold text-accent"
                  style={{ borderColor: "var(--accent)" }}
                >
                  Hacer una foto
                </button>
              </div>

              <input
                ref={input}
                type="file"
                accept={TIPOS}
                className="sr-only"
                onChange={(e) => { const f = e.target.files?.[0]; if (f) analizar(f); e.target.value = ""; }}
              />
              <input
                ref={camara}
                type="file"
                accept="image/*"
                capture="environment"
                className="sr-only"
                onChange={(e) => { const f = e.target.files?.[0]; if (f) analizar(f); e.target.value = ""; }}
              />
            </div>

            {error && (
              <p className="bg-warn-soft materializa mt-4 rounded-[var(--radius-control)] px-3.5 py-2.5 text-[0.8125rem]">
                {error}
              </p>
            )}

            <p className="t-pie mt-4 text-dim">
              Tu documento se lee en el momento y no se guarda en ningún sitio.
              No extraemos tu nombre, tu DNI ni tus datos de contacto: solo las
              coberturas que hacen falta para comparar.
            </p>
          </>
        )}

        {/* ------------------------------------------------------- Analizando */}
        {fase === "analizando" && (
          <div className="py-8 text-center">
            <span className="cargando mx-auto block h-11 w-11 rounded-full" aria-hidden="true" />
            <h2 id="adj-titulo" className="t-seccion mt-5 text-fg">
              Leyendo tu póliza
            </h2>
            <p className="t-pie mt-2 text-dim">
              {nombre} · esto tarda unos segundos
            </p>
          </div>
        )}

        {/* -------------------------------------------------------- Resultado */}
        {fase === "resultado" && poliza && (
          <div className="materializa">
            <h2 id="adj-titulo" className="t-seccion pr-10 text-fg">
              Esto es lo que hemos entendido
            </h2>
            <p className="t-pie mt-2 text-dim">
              Repásalo: si algo no cuadra, dínoslo al hablar con el asesor.
            </p>

            <div className="card mt-5 divide-y divide-[var(--line)] overflow-hidden">
              {[
                ["Compañía", poliza.compania],
                ["Producto", poliza.producto],
                ["Prima", poliza.prima],
                ...poliza.datos.map((d) => [d.etiqueta, d.valor] as [string, string]),
              ]
                .filter(([, v]) => v)
                .map(([k, v]) => (
                  <div key={k} className="flex items-start justify-between gap-4 px-4 py-2.5">
                    <dt className="t-pie shrink-0 text-dim">{k}</dt>
                    <dd className="t-pie text-right font-medium text-fg">{v}</dd>
                  </div>
                ))}
            </div>

            {poliza.avisos.length > 0 && (
              <ul className="bg-warn-soft mt-4 grid gap-1.5 rounded-[var(--radius-control)] px-4 py-3">
                {poliza.avisos.map((a) => (
                  <li key={a} className="text-[0.8125rem] leading-relaxed">· {a}</li>
                ))}
              </ul>
            )}

            {poliza.confianza === "baja" && (
              <p className="t-pie mt-3 text-dim">
                El documento se leía con dificultad, así que puede que falte
                algo. Un asesor lo revisará contigo.
              </p>
            )}

            {formularioLlamada("Déjanos un teléfono y te decimos si te conviene cambiar")}
          </div>
        )}

        {/* ---------------------------------------------------------- Enviado */}
        {fase === "enviado" && (
          <div className="materializa py-4 text-center">
            <span className="bg-ok-soft mx-auto grid h-12 w-12 place-items-center rounded-full">
              <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth={3} strokeLinecap="round" strokeLinejoin="round">
                <path d="m5 12.5 4.5 4.5L19 6.5" />
              </svg>
            </span>
            <h2 id="adj-titulo" className="t-seccion mt-4 text-fg">
              Gracias, hemos recibido tus datos
            </h2>
            <p className="t-cuerpo mt-3 text-dim">
              Uno de nuestros agentes especialistas se pondrá en contacto con
              usted para ayudarle a encontrar la mejor opción.
            </p>
            <button
              type="button"
              onClick={() => ref.current?.close()}
              className="pulsable mt-6 rounded-full px-6 py-2.5 text-[0.9rem] font-semibold"
              style={{ background: "var(--accent)", color: "var(--accent-fg)" }}
            >
              Cerrar
            </button>
          </div>
        )}
      </div>
    </dialog>
  );
}

/** Botón que abre el diálogo. `tono` lo adapta al hero oscuro o al papel. */
export function BotonAdjuntar({
  ramo,
  tono = "banda",
}: {
  ramo?: string;
  tono?: "banda" | "papel";
}) {
  const [abierto, setAbierto] = useState(false);

  return (
    <>
      <button
        type="button"
        onClick={() => setAbierto(true)}
        className={`pulsable inline-flex w-full items-center justify-center gap-2 rounded-full px-6 py-3.5 text-center text-[0.95rem] font-semibold sm:w-auto ${
          tono === "banda"
            ? "border border-white/30 bg-white/10 text-white backdrop-blur-sm"
            : "border-2 text-accent"
        }`}
        style={tono === "papel" ? { borderColor: "var(--accent)" } : undefined}
      >
        <Icono name="documento" className="h-4 w-4 shrink-0" />
        Adjunta tu seguro y compara
      </button>
      <AdjuntarPoliza abierto={abierto} onCerrar={() => setAbierto(false)} ramo={ramo} />
    </>
  );
}
