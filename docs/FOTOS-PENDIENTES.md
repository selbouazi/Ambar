# Fotos pendientes de Ambar

Generado automáticamente por `npm run photos`. No editar a mano.

## Cómo funciona

1. Coloca los originales en `public/photos/` con **exactamente** estos nombres
   (la extensión puede ser `.jpg`, `.jpeg`, `.png`, `.webp` o `.avif`).
2. Ejecuta `npm run photos`.
3. El script genera las variantes optimizadas en `public/photos/gen/` y
   actualiza `src/data/photo-manifest.json`. La web las usa sola: no hay que
   tocar ningún componente.
4. Vuelve a ejecutar `npm run photos` cada vez que cambies una foto.

Mientras una foto no exista, la web muestra un panel de marca con el nombre del
plato y la proporción exacta de la foto final: la maquetación nunca deja una
caja vacía.

**Derechos:** las fotos son del propietario del restaurante y se usan con su
permiso. No se enlazan ni se descargan imágenes de Google Maps desde el código.

## Huecos por rellenar (1)

| Archivo | Proporción ideal | Etiqueta | Dónde va |
|---|---|---|---|
| `public/photos/cuscus.jpg` | 4/3 | Cuscús con verduras y garbanzos, el plato de los viernes. | Portada y carta, bloque de cuscús (foto pendiente) |

## Fotos ya colocadas (11)

- `hero-interior` — Portada (fondo a pantalla completa)
- `comedor` — Portada, bloque «Un rincón marroquí»
- `tajine` — Carta, categoría Platos
- `lubina` — Carta, categoría Pescado
- `marisco` — Carta, categoría Entrantes
- `galeria-01` — Galería
- `galeria-02` — Galería
- `galeria-03` — Galería
- `galeria-04` — Galería y mapa
- `galeria-05` — Galería
- `galeria-06` — Galería

## Descartadas o limitadas por resolución

Ninguna se amplía: si una foto no llega, no se publica en lugar de subirla a
fuerza. Los originales se conservan en `src/assets/photos/raw/`.

### Descartadas

| Archivo | Tamaño | Motivo |
|---|---|---|
| `propietario-2026-11/foto1.png` | 979 × 1284 | Mariscada con los controles y la marca de Google Maps superpuestos. |
| `propietario-2026-11/foto2.png` | 974 × 1208 | Bocadillos: el fondo de cocina y la bolsa verde restan calidad. Se conserva por si se quiere usar. |
| `propietario-2026-11/cuscus-instagram.jpg` | 361 × 640 | Única foto con aspecto de cuscús: bajada de Instagram con texto encima y demasiado pequeña. Sigue pendiente una foto real. |
| `ig-01…ig-12.jpg` (12) | 360–361 × 640 | Historias de Instagram: varias llevan texto o burbujas de la app y todas son de 361 px de ancho. |
| `reel-0…reel-11.jpg` (8) | 360–361 × 640 | Fotogramas de reels con el botón de reproducción encima. |
| `google-fachada-1200/1600/2048.jpg` | hasta 2048 × 1152 | Interior de la ficha de Google, no del envío del titular: su uso no está confirmado. |

### Limitadas por resolución (sí publicadas)

- Todos los originales publicados miden como máximo **1179 px** de ancho
  (`galeria-02`: 1008 px). El script solo genera variantes hasta el ancho
  nativo, así que **no hay variantes de 1440 ni de 1920 px**.
- `hero-interior` es 1179 × 874 (3:2), no 16:9: en un fondo a pantalla
  completa se recorta por los lados. Conviene pedir el original 16:9 de al
  menos 1920 px.
- En pantallas de escritorio grandes las fotos se sirven a su ancho nativo y
  pueden verse algo blandas. No se interpola ningún tamaño mayor.

## Recomendaciones de captura

- Luz natural o la luz cálida del local; evitar el flash directo.
- Horizontal 16:9 para el hero y las bandas; vertical 4:5 para el retrato del local.
- Que el plato ocupe el centro del encuadre y dejar aire alrededor.
- Mínimo 1600 px en el lado largo. El script se encarga del resto.
- Para la galería, mezclar sala, platos y detalle de la decoración.
