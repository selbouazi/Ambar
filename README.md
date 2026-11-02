# Restaurante Halal Ambar · web

Web pública del Restaurante Halal Ambar (Ctra. de Valls, 70, El Vendrell).
React + Vite + Tailwind CSS 4, sin backend.

## Puesta en marcha

```bash
npm install
npm run dev      # servidor local
npm run build    # build de producción en dist/
npm run preview  # sirve el build
```

No hay `npm run lint`: el proyecto no tiene ESLint configurado.

## Dónde se cambia el contenido

| Qué | Archivo |
|---|---|
| Dirección, teléfono, horario, servicios, reseñas, enlaces | `src/data/site.ts` |
| Carta completa | `src/data/menu.json` |
| Textos, FAQ y metadatos SEO | `src/data/copy.ts` |
| Fotos y textos alternativos | `src/data/photo-specs.json` |
| Fotos publicadas | `public/photos/` |
| Metadatos estáticos y JSON-LD inicial | `index.html` |
| Dominio público (`SITE_URL`) | `src/components/Seo.jsx` |

La carta se edita en `menu.json`; `menu.ts` solo añade tipos y utilidades de
formato. Los precios son números en euros (`7`, `1.5`) o `pricePending` cuando
falta el dato.

## Fotos

```bash
npm run photos
```

Genera las variantes AVIF/WebP/JPG en `public/photos/gen/`, actualiza
`src/data/photo-manifest.json` y el informe `docs/FOTOS-PENDIENTES.md`.

Para la imagen social:

```bash
npm run og
```

Para el logo del nav, el favicon y los iconos de iOS/PWA:

```bash
npm run brand
```

El original del logo está en
`src/assets/photos/raw/propietario-2026-11/favicoin.png`; el script genera las
variantes de `public/brand/` y los iconos cuadrados.

## QA

Con el build servido en el puerto 4173:

```bash
npm run preview -- --port 4173
npm run qa
```

Genera las capturas en `docs/qa/` y comprueba títulos, enlaces, desbordamiento,
imágenes, errores de consola, peticiones a terceros, buscador, FAQ y mapa.

## Rutas

- `/` portada
- `/carta` carta completa con buscador
- `/el-local` horario, cómo llegar, servicios y FAQ
- `/resenas` reseñas de Google
- `/aviso-legal`
- `/politica-de-cookies`
- 404 para cualquier otra ruta

Las rutas antiguas `/informacion`, `/contacto` y `/cookies` redirigen.

## Privacidad

Sin cookies propias ni analítica. El mapa de Google no se carga hasta que el
visitante pulsa «Cargar mapa». Las tipografías se sirven desde el mismo
dominio.

## Pendientes antes de publicar

Ver `docs/PENDIENTES.md` (NIF, precios que faltan, fotos definitivas, logo
vectorial y dominio) y `docs/FOTOS.md` (procedencia y limitaciones de las fotos
actuales).
