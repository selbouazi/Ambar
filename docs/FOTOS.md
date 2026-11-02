# Fotos de la web

Estado del material fotográfico a **2 de noviembre de 2026**.

## De dónde sale cada foto

Todas las imágenes son del propio restaurante. No se ha usado ninguna foto de
banco de imágenes ni de terceros.

| Archivo final | Origen | Uso | Estado |
|---|---|---|---|
| `public/photos/hero-interior.jpg` | Ficha de Google del restaurante | Fondo de la portada | Provisional |
| `public/photos/comedor.jpg` | Recorte de la foto anterior | Bloque «Un rincón marroquí» | Provisional |
| `public/photos/galeria-04.jpg` | Recorte de la foto anterior | Galería y fondo del mapa | Provisional |
| `public/photos/cuscus.jpg` | Perfil de Instagram `@amb_ar2022` | Bloque de cuscús y carta | Provisional, baja resolución |
| `public/photos/lubina.jpg` | Perfil de Instagram `@amb_ar2022` | Carta, pescado | Provisional, baja resolución |
| `public/photos/marisco.jpg` | Perfil de Instagram `@amb_ar2022` | Carta, entrantes y portada | Provisional, baja resolución |
| `public/photos/galeria-01.jpg` | Perfil de Instagram `@amb_ar2022` | Galería | Provisional, baja resolución |
| `public/photos/galeria-02.jpg` | Perfil de Instagram `@amb_ar2022` | Galería | Provisional, baja resolución |
| `public/photos/galeria-03.jpg` | Perfil de Instagram `@amb_ar2022` | Galería | Provisional, baja resolución |

Los originales descargados se conservan en `src/assets/photos/raw/` como
prueba de procedencia. No se publican.

### Limitaciones conocidas

- La foto grande del comedor procede de la ficha de Google. Es la única imagen
  nítida y de tamaño suficiente; se ha recortado para la portada, el bloque de
  historia y la galería.
- Las fotos de Instagram son capturas de historias de 640 px de ancho. Varias
  llevan texto o marcas de la propia publicación. Aunque los recortes de la web
  evitan la mayor parte de esos elementos, **no son material definitivo**.
- No hay fotos de la terraza ni de la fachada. Por eso la galería se limita a
  lo que hay.

## Cómo sustituirlas

1. Guarda los originales en `public/photos/` con el mismo nombre (`hero-interior.jpg`,
   `cuscus.jpg`, etc.). La extensión puede ser `.jpg`, `.jpeg`, `.png`, `.webp`
   o `.avif`.
2. Ejecuta `npm run photos`. El script genera las variantes optimizadas en
   `public/photos/gen/` y actualiza `src/data/photo-manifest.json`.
3. Comprueba `docs/FOTOS-PENDIENTES.md`, que se regenera en cada ejecución.

Recomendaciones para la sesión definitiva:

- Horizontal 16:9 para la portada; vertical 4:5 para el retrato del comedor.
- Luz natural o la luz cálida del local, sin flash directo.
- Mínimo 1600 px en el lado largo.
- Platos centrados y con aire alrededor.
- Mezclar sala, platos, terraza y fachada.

## Derechos

Las fotos se publican porque son del restaurante. Antes de cerrar la web, el
titular debe confirmar por escrito que autoriza su uso en la web y en redes.
