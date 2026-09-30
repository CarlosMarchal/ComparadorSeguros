# Comparador Marchal 2026 · cómo trabajar en local

## Arrancarlo

**Opción fácil:** doble clic en `Arrancar comparador.command`.
La primera vez instala las dependencias (tarda un par de minutos) y luego abre
solo el navegador en http://localhost:3000.

> Si macOS avisa de que no puede abrirlo por venir de un desarrollador no
> identificado: clic derecho sobre el archivo → Abrir → Abrir.

**Opción terminal:**

```bash
cd ~/Desktop/"comparador marchal 2026"
npm install     # solo la primera vez
npm run dev
```

Necesitas Node.js instalado (versión LTS desde nodejs.org).

## Ver los cambios mientras editas

Con `npm run dev` corriendo, cada vez que guardes un archivo el navegador se
recarga solo. No hace falta reiniciar nada.

## Qué tocar para cada cosa

| Quieres cambiar…                          | Edita este archivo                    |
|-------------------------------------------|---------------------------------------|
| Textos de un ramo, consejos, FAQ          | `src/data/ramos.ts`                   |
| Productos, coberturas y precios           | `src/data/productos.ts`               |
| Compañías y sus colores                   | `src/data/companias.ts`               |
| Teléfono, email, dirección, dominio       | `src/data/site.ts`                    |
| Colores, tipografías, fondos              | `src/app/globals.css`                 |
| Comportamiento del comparador             | `src/components/Comparador.tsx`       |
| Home                                      | `src/app/page.tsx`                    |

Los archivos de `src/data/` son datos puros: cambiando ahí se actualizan a la
vez el menú, el footer, las fichas, el sitemap y las comparativas.

## Antes de publicar

En `src/data/productos.ts`, `DATOS_VALIDADOS` está en `false` y por eso sale el
banner amarillo. Cuando sustituyas los valores por las notas técnicas reales de
cada compañía, ponlo en `true` y desaparece.

## Comandos

```bash
npm run dev      # desarrollo, con recarga automática
npm run build    # build de producción
npm run start    # sirve el build (comprueba que todo compila)
npm run lint     # revisa el código
```

Ver `README.md` para la estructura completa y la integración con HubSpot.
