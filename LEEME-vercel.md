# Publicar en Vercel

El proyecto ya está listo para desplegarse. Esta guía es para tener una URL
pública temporal (`algo.vercel.app`) y luego cambiarla por tu dominio sin
tocar código.

---

## La vía rápida: desde tu Mac, sin GitHub

Abre la Terminal, ve a la carpeta del proyecto y lanza:

```bash
cd ~/Desktop/"comparador marchal 2026"
npx vercel
```

La primera vez te pedirá iniciar sesión (abre el navegador) y luego hará
cuatro preguntas. Responde:

| Pregunta | Respuesta |
| --- | --- |
| Set up and deploy? | **Y** |
| Which scope? | tu cuenta |
| Link to existing project? | **N** |
| Project name? | `comparador-marchal` (o el que quieras) |
| In which directory is your code? | **Intro** (`./`) |

Detecta Next.js solo, no cambies nada de la configuración que proponga.

Al terminar te da una URL de *preview*. Para la URL estable de producción:

```bash
npx vercel --prod
```

Esa es la que puedes pasar: `https://comparador-marchal.vercel.app`.

---

## La vía recomendada si vas a seguir tocando: GitHub

Merece la pena porque a partir de ahí cada cambio se publica solo.

```bash
cd ~/Desktop/"comparador marchal 2026"
git init
git add .
git commit -m "Comparador de seguros"
```

Crea un repositorio **privado** en github.com (sin README ni .gitignore, que
ya los tienes) y sigue las dos líneas que te da GitHub para subirlo.

Después, en [vercel.com/new](https://vercel.com/new): *Import Git Repository*,
eliges el repo, **Deploy**. Desde ese momento, cada `git push` publica.

El `.gitignore` ya excluye `node_modules`, `.next`, `.vercel` y **cualquier
`.env`**, así que tu clave de API no se sube. Compruébalo antes del primer
push con `git status` — no debe aparecer ningún `.env`.

---

## Variables de entorno

En Vercel: **Settings → Environment Variables**. Añade:

| Nombre | Valor | Para qué |
| --- | --- | --- |
| `ANTHROPIC_API_KEY` | `sk-ant-…` | Leer las pólizas que suban los usuarios |

Márcala para *Production*, *Preview* y *Development*.

Sin ella la web funciona igual, pero el botón «Adjunta tu seguro y compara»
avisa de que el análisis no está disponible. Si aún no quieres gastar en
API, despliega sin la clave y la añades luego (hay que redesplegar).

Después de añadir variables hay que volver a desplegar para que surtan
efecto: **Deployments → … → Redeploy**.

---

## Lo que ya está resuelto en el código

**La dirección del sitio no está escrita a mano.** Los canonical, el sitemap
y las etiquetas para compartir cogen la URL real del despliegue
(`NEXT_PUBLIC_VERCEL_URL`, que Vercel inyecta sola). Cuando pongas tu dominio,
añade `NEXT_PUBLIC_SITE_URL=https://tudominio.es` y manda esa.

**Google no va a indexar la URL de pruebas.** Esto importa más de lo que
parece. Si Google se queda con `comparador-marchal.vercel.app`, indexa una web
con precios sin validar, y cuando llegue el dominio bueno los dos compiten por
el mismo contenido. Por eso el sitio sale **cerrado a buscadores por defecto**:
`robots.txt` devuelve `Disallow: /` y cada página lleva `noindex`.

Para abrirlo, el día que esté en el dominio definitivo y con los datos
validados, añade la variable:

```
NEXT_PUBLIC_INDEXAR = true
```

y redespliega. Solo en Production, nunca en Preview.

---

## Cuando tengas el dominio

1. Vercel → **Settings → Domains → Add**, escribe tu dominio.
2. Vercel te dice qué registro DNS crear en tu proveedor (normalmente un
   `CNAME` a `cname.vercel-dns.com`, o un `A` a su IP para el dominio raíz).
3. Cuando verifique, añade `NEXT_PUBLIC_SITE_URL` con ese dominio y, si ya
   toca, `NEXT_PUBLIC_INDEXAR=true`. Redespliega.

La URL `.vercel.app` sigue funcionando; si no la quieres accesible, en
*Settings → Deployment Protection* puedes pedir contraseña para todo lo que no
sea el dominio.

---

## Antes de enseñárselo a alguien de fuera

- Los **precios de las pólizas son una plantilla realista, no tarifas
  validadas** con las compañías. El aviso amarillo de arriba lo dice; no lo
  quites hasta haberlas confirmado.
- Las **valoraciones son contenido de ejemplo** y lo advierten en pantalla.
- Los **logotipos** son los archivos que me pasaste, no los del manual de marca
  de cada aseguradora.
- Si vas a dejar subir pólizas de verdad, repasa antes
  `LEEME-adjuntar-poliza.md`: falta el contrato de encargado del tratamiento y
  actualizar la política de privacidad.

---

## Si algo falla

**El build falla en Vercel pero en local va.** Casi siempre es una diferencia
de versión de Node. En *Settings → General → Node.js Version* pon la 22.

**«Module not found».** Suele ser una mayúscula: macOS no distingue
`Iconos.tsx` de `iconos.tsx`, y el servidor de Vercel sí.

**El análisis de pólizas devuelve error 503.** Falta `ANTHROPIC_API_KEY`, o se
añadió sin redesplegar.

**Sale un 404 en las páginas de ramo.** Se te ha quedado una carpeta `out/` de
una exportación estática antigua. Bórrala y vuelve a desplegar.
