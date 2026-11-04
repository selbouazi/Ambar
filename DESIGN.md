# Diseño de Restaurante Halal Ambar

Guía visual del sitio. Sirve para revisar cambios y para que cualquier
modificación futura mantenga la misma dirección. El contenido, las rutas y los
datos reales no se tocan aquí: eso vive en `src/data/`.

- Dirección elegida: **«The name as monument»**, adaptada a la marca.
- Referencia principal: `design-taste-frontend`.
- Fuentes de verdad de datos: `src/data/site.ts`, `src/data/menu.json`,
  `src/data/copy.ts`.

## 1. Dirección

El nombre manda. **Ambar** se escribe en grande, en Anton, sobre fotografía real
del local: la primera pantalla es el logotipo tipográfico, no un titular de
marketing. Alrededor, dos superficies que se alternan —negro cálido y papel— y
el dorado del logotipo como única acentuación.

Lo que define la dirección:

1. **Monumento tipográfico.** El nombre ocupa la portada a `clamp(5.4rem, 21vw,
   14rem)`. Los titulares de sección van en Anton, siempre en minúscula de
   caja alta natural, con `leading` corto (0.86–1.02).
2. **Dos superficies.** Secciones alternas de negro cálido (`night-950`,
   `night-900`) y papel (`cream-50`). Nunca fondos amarillos, nunca degradados
   de marca.
3. **Dorado del logotipo, no amarillo.** El ámbar se extrajo del PNG del
   titular (rango `#a07028`–`#e8c870`). El amarillo puro está prohibido.
4. **Fotografía sin adornos.** Fotos reales, proporciones fijas, sin marcos
   girados, sin sombras duras, sin viñetas. La foto se sirve en su resolución
   nativa como máximo (ver `docs/FOTOS-PENDIENTES.md`).
5. **Trama de estrella.** El motivo octogonal del logotipo se repite al 4.5 %
   de opacidad como textura de fondo; es el único patrón decorativo.

## 2. Color

Tokens en `src/index.css`, bloque `@theme`.

| Token | Valor | Uso | Contraste |
|---|---|---|---|
| `night-950` | `#100f0c` | Fondo principal, pie, barras | — |
| `night-900` | `#17150f` | Superficie elevada sobre oscuro | — |
| `night-800` | `#211e17` | Bordes y paneles | — |
| `cream-50` | `#f5efe3` | Papel: secciones claras | 16.74 con `night-950` |
| `cream-200` | `#c8bca8` | Texto secundario sobre oscuro | 10.24 con `night-950` |
| `ink` | `#17140f` | Texto sobre papel | 16.04 con `cream-50` |
| `ink-soft` | `#454033` | Texto largo sobre papel | 9.01 con `cream-50` |
| `ink-mute` | `#5f5748` | Notas y etiquetas sobre papel | 6.23 con `cream-50` |
| `gold-500` | `#c8a35a` | Acento principal, CTA, iconos | 8.07 con `night-950` |
| `gold-400` | `#d6b46c` | Acento sobre oscuro | 9.68 con `night-950` |
| `gold-300` | `#e5cf9c` | Enlaces sobre oscuro | 12.54 con `night-950` |
| `gold-700` | `#7c5a23` | Acento sobre papel | 5.48 con `cream-50` |

Reglas:

- Sobre papel, el acento es **siempre `gold-700`** (`gold-600` da 3.31 y no se
  usa para texto).
- Sobre oscuro, el acento es `gold-500`/`gold-400`; los enlaces, `gold-300`.
- Todo el texto cumple AA (≥ 4.5) y el texto grande AAA.
- Verde hoja (`leaf`) y verde de estado (`open`) son decorativos y de estado:
  nunca compiten con el dorado.

## 3. Tipografía

Dos familias, ambas servidas desde el propio dominio (sin peticiones a Google,
sin cookies de terceros):

- **Anton** (`font-display`) — titulares, cifras y el nombre. Una sola
  variante, peso 400.
- **Inter** (`font-sans`) — texto, botones, menús, precios, reseñas. Pesos
  400–600.

Escala práctica:

| Uso | Clase habitual |
|---|---|
| Nombre de portada | `text-[clamp(5.4rem,21vw,14rem)] leading-[0.78]` |
| H1 de página | `text-[clamp(3.4rem,8vw,7rem)] leading-[0.88]` |
| H2 de sección | `text-[clamp(2.8rem,6.8vw,6rem)] leading-[0.94]` |
| H3 de plato / tarjeta | `text-[17–19px] font-medium` |
| Texto largo | `text-[16–17px] leading-relaxed` |
| Notas y pies | `text-[13–14px]` |

Prohibido:

- Tercera familia, cursiva decorativa o fuente manuscrita.
- `uppercase` forzado en reseñas, titulares o navegación: las reseñas van en
  capitalización normal, en Inter.
- `tracking` negativo agresivo más allá de `-0.035em`.

## 4. Composición

### Portada

- Hero a `100svh`, foto de sala o de comida a sangre, con `.photo-scrim`
  (degradado vertical + diagonal) para que el texto se lea.
- Orden: nombre → entradilla → CTA → barra de datos (halal, valoración,
  horario). Sin etiqueta de ceja sobre el nombre.
- Variante móvil con `mobilePhotoKey` para no mostrar el techo.
- Una sola CTA primaria en pantalla; el resto, secundaria (`onDark`/`onCream`).

### Secciones

- Alternan `night-950` → `cream-50` → `night-950`. Una sección clara nunca da
  a otra clara.
- Rejilla de 12 columnas en escritorio (`lg:grid-cols-12`), con contenido a
  `max-w-[86rem]` y `px-12`.
- Cada bloque entra con `Reveal`: `translateY(14px)` + `opacity`, 220 ms,
  escalonado de 40–60 ms. Fallback sin JS visible por defecto.

### Carta

- Cabecera oscura → barra de categorías `sticky` → buscador → categorías en
  papel → cierre oscuro → pie.
- Orden fijo: Entrantes, Platos, Platos combinados, Tacos, Hamburguesas,
  Bocadillos, Pizzas, Pescado y marisco, Batidos, Bebidas.
- Categoría con > 5 platos: dos columnas en escritorio.
- Precio a la derecha, `tnum`, con línea de puntos (`.menu-leader`) entre plato
  y precio. Precio pendiente: el texto «Consultar», nunca un número inventado.
- Foto de categoría: una por categoría, 4/3, sin marco.

### Reseñas

- Texto en Inter, capitalización normal, comillas tipográficas `« »`.
- Nunca mayúsculas condensadas ni tipografía de titular en el cuerpo de la
  reseña. El nombre va en `truncate`, la fuente debajo.
- No se pintan estrellas por reseña individual (no está verificado).

### Fotos

- `Photo` sirve avif/webp/jpg con `srcset`, `width`/`height` y `loading="lazy"`
  salvo el hero (`eager` + `fetchpriority="high"`).
- `ratio` fijo (`16/9`, `4/5`, `4/3`, `3/2`, `1/1`): nada de alturas libres que
  provoquen salto de diseño.
- Sin ampliar: el manifiesto solo genera tamaños ≤ ancho nativo.
- Falta la foto → panel de marca con el nombre del plato, nunca un hueco.

### Mosaico de galería

- Móvil: primera foto a todo el ancho, pares siguientes, última a todo el
  ancho.
- Escritorio (`md+`): primera foto ocupando 2 × 2, dos apiladas a su derecha y
  tres en la fila inferior. Sin huecos en la rejilla.

## 5. Movimiento

- Solo `transform` y `opacity`. Duración 150–250 ms, easing
  `--ease-premium: cubic-bezier(0.22, 1, 0.36, 1)`.
- Sin rebotes, sin `scale` agresivo, sin desplazamientos largos.
- Hover: desplazamiento de 1–2 px o cambio de escala de 1.015 en la foto.
  Focus: `outline: 2px solid gold-500` con `offset 3px` en todo el sitio.
- `prefers-reduced-motion: reduce` desactiva reveal, transiciones y animaciones.
- Sin parallax de desplazamiento: el hero no se mueve al hacer scroll.

## 6. Accesibilidad y rendimiento

- Contraste AA en todos los textos; objetivos táctiles ≥ 44 px
  (`min-h-11`/`min-h-12`).
- Sin scroll horizontal a 390, 768 y 1440 px.
- `Reveal` es visible sin JavaScript y con temporizador de seguridad a 3 s.
- Menú móvil: foco atrapado, `Escape` cierra, `aria-expanded` correcto.
- FAQ: botón con `aria-expanded`/`aria-controls`, panel oculto con `hidden`.
- Galería: `role="dialog"`, flechas de teclado, cierre con `Escape`.
- Mapa sin incrustar hasta que el visitante pulsa «Cargar mapa».

## 7. Prohibido

- Amarillo puro, fondos amarillos de sección, pastillas de color.
- Fuente manuscrita, marcos tipo polaroid, sombras duras, bordes girados.
- Tercera familia tipográfica.
- Más de una CTA primaria por pantalla.
- Mayúsculas condensadas en reseñas; comillas `<< >>` en lugar de `« »`.
- Ampliar fotos por debajo de su resolución nativa; fotos de stock.
- Datos nuevos: precios, horarios, servicios o reseñas que no estén en
  `src/data/`.
