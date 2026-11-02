# Datos pendientes de confirmar

Todo lo que aparece en la web sale de `src/data/site.ts` y `src/data/menu.json`.
Lo que falta **no se ha inventado**: se muestra solo lo confirmado y queda
pendiente en este documento.

## 1. Horario

Confirmado por el titular el 2 de noviembre de 2026:

- Lunes: cerrado.
- Martes a domingo: de 12:30 a 24:00.

Queda por confirmar:

- Cierre por vacaciones y festivos.
- Si el horario cambia en verano.
- Los desayunos ya no se ofrecen y se han retirado de la web.

## 2. Datos fiscales y legales

- NIF/CIF y razón social del titular.
- Domicilio fiscal, si es distinto del restaurante.
- Datos registrales, si proceden.
- Revisión del aviso legal y de la política de cookies por parte del titular o
  de su asesoría.

## 3. Carta y precios

- Precio de «Croquetas / Fingers / Nuggets» (en la carta figura «Consultar»).
- Confirmar que el cuscús sigue siendo solo de los viernes y a 7 €.
- Confirmar precios de temporada y disponibilidad de pescado fresco.
- Texto de alérgenos: la web remite al personal, pero conviene revisar la
  obligación de información al consumidor.
- Confirmar que los precios incluyen IVA y que la frase «IVA incluido salvo
  error» es correcta.

## 4. Reservas y pedidos

- Política de reservas y de grupos (tamaño máximo, anticipación, menús).
- Número de WhatsApp, si se quiere ofrecer ese canal.
- Plataformas de reparto con las que se trabaja.
- Confirmar el teléfono público: **666 05 55 26**.

## 5. Fotos y marca

- Autorización por escrito para publicar las fotos actuales.
- Fotos definitivas de terraza, fachada y más interiores.
- Logotipo original en vector (SVG, AI o EPS). El actual es una recreación
  dibujada para la web.
- Confirmar el nombre público: «Restaurante Halal Ambar» / «Ambar».

## 6. Publicación

- Dominio definitivo. Ahora `SITE_URL` es
  `https://restaurante-halal-ambar.vercel.app` (en `src/components/Seo.jsx`).
  Al cambiarlo hay que actualizar también `index.html`, `public/robots.txt`,
  `public/sitemap.xml` y `public/manifest.webmanifest`.
- Cuenta de despliegue y analítica: la web no incluye cookies propias ni
  analítica. Si se añade, hay que actualizar la política de cookies.
- Confirmar el enlace de Instagram `@amb_ar2022`.

## 7. Contenido que falta

- Carta física escaneada para un enlace «Ver la carta original». No se dispone
  de ella; por eso no hay enlace.
- Fotos y textos de la terraza.

## 8. Reseñas

- La valoración mostrada es **4,9 · 154 reseñas** con datos de noviembre de
  2026. Es una foto fija: si se quiere actualizar, hay que revisar la ficha de
  Google y cambiar `site.rating` y los textos de `copy.ts` y `index.html`.
- Las reseñas se muestran como extractos. No se inventan estrellas por reseña.
- No se incluye `aggregateRating` en el JSON-LD para no duplicar la valoración
  de Google sin control del titular.
