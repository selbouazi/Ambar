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

Mientras una foto no exista, la web muestra un panel de zellige con el nombre
del plato. No aparece el texto «FOTO PENDIENTE» en ninguna build.

**Derechos:** las fotos son del propietario del restaurante y se usan con su
permiso. No se enlazan ni se descargan imágenes de Google Maps desde el código.

## Huecos por rellenar (22)

| Archivo | Proporción ideal | Dónde va |
|---|---|---|
| `public/photos/hero-interior.jpg` | 16/9 | Portada (fondo a pantalla completa, 16:9 horizontal y vertical para móvil) |
| `public/photos/historia-interior.jpg` | 4/5 | Portada, bloque «Un rincón marroquí» (vertical 4:5) |
| `public/photos/fachada.jpg` | 3/2 | Cómo llegar (horizontal 3:2) |
| `public/photos/tajin.jpg` | 4/3 | Carta destacada y galería (horizontal 4:3) |
| `public/photos/cuscus.jpg` | 4/3 | Banner «Cuscús los viernes» (horizontal 4:3) |
| `public/photos/lubina.jpg` | 4/3 | Carta destacada (horizontal 4:3) |
| `public/photos/marisco.jpg` | 4/3 | Carta destacada y galería (horizontal 4:3) |
| `public/photos/tacos.jpg` | 4/3 | Carta destacada y galería (horizontal 4:3) |
| `public/photos/desayuno-msemmen.jpg` | 4/3 | Sección «Desayunos marroquíes» (horizontal 4:3) |
| `public/photos/te-marroqui.jpg` | 4/3 | Sección «Desayunos marroquíes» (horizontal 4:3) |
| `public/photos/galeria-01.jpg` | 4/3 | Galería |
| `public/photos/galeria-02.jpg` | 4/3 | Galería |
| `public/photos/galeria-03.jpg` | 4/3 | Galería |
| `public/photos/galeria-04.jpg` | 4/3 | Galería |
| `public/photos/galeria-05.jpg` | 4/3 | Galería |
| `public/photos/galeria-06.jpg` | 4/3 | Galería |
| `public/photos/galeria-07.jpg` | 4/3 | Galería |
| `public/photos/galeria-08.jpg` | 4/3 | Galería |
| `public/photos/galeria-09.jpg` | 4/3 | Galería |
| `public/photos/galeria-10.jpg` | 4/3 | Galería |
| `public/photos/galeria-11.jpg` | 4/3 | Galería |
| `public/photos/galeria-12.jpg` | 4/3 | Galería |

## Fotos ya colocadas (0)

_Ninguna todavía._

## Recomendaciones de captura

- Luz natural o la luz cálida del local; evitar el flash directo.
- Horizontal 16:9 para el hero y las bandas; vertical 4:5 para el retrato del local.
- Que el plato ocupe el centro del encuadre y dejar aire alrededor.
- Mínimo 1600 px en el lado largo. El script se encarga del resto.
- Para la galería, mezclar sala, platos y detalle de la decoración.
