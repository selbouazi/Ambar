/**
 * Interruptor de prototipo.
 *
 * `PROTOTIPO = true`  → la web muestra datos de ejemplo, huecos de foto
 *                        etiquetados y un aviso de «Prototipo».
 * `PROTOTIPO = false` → la web real, con los datos de `src/data/business.ts`
 *                        y `src/data/menu.ts`, sin avisos.
 *
 * Se resuelve en tiempo de compilación desde `vite.config.js`, de modo que la
 * variante que no se usa se elimina del bundle (los datos reales no viajan al
 * navegador en modo prototipo).
 *
 * Para volver a la web real:
 *   VITE_PROTOTIPO=false npm run build
 * o crear un `.env` con `VITE_PROTOTIPO=false`.
 */
declare const __PROTOTIPO__: boolean

export const PROTOTIPO: boolean =
  typeof __PROTOTIPO__ === 'boolean' ? __PROTOTIPO__ : true
